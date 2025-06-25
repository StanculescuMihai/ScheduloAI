import json
from datetime import datetime, timedelta
import os
from supabase import create_client, Client
from flask import request

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_ANON_KEY")

if not supabase_url or not supabase_key:
    raise Exception("Supabase URL and key must be set as environment variables.")

supabase: Client = create_client(supabase_url, supabase_key)

def find_available_time_slot(schedule, duration=timedelta(hours=1)):
    """
    Finds an available time slot in a given schedule.

    Args:
        schedule: A list of tuples, where each tuple represents a booked time slot
                  (start_time, end_time).  Times should be datetime objects.
        duration: The desired duration of the open time slot (default: 1 hour).

    Returns:
        A tuple (start_time, end_time) representing the available time slot,
        or None if no slot is found.
    """

    schedule.sort()  # Ensure schedule is sorted by start time

    # Handle empty schedule
    if not schedule:
        return (datetime.now(), datetime.now() + duration)

    # Check for available time before the first event
    if schedule[0][0] - datetime.now() >= duration:
        return (datetime.now(), schedule[0][0])

    # Iterate through the schedule and find gaps
    for i in range(len(schedule) - 1):
        gap_start = schedule[i][1]
        gap_end = schedule[i+1][0]
        if gap_end - gap_start >= duration:
            return (gap_start, gap_end)

    # Check for available time after the last event
    if datetime.now() + timedelta(days=1) - schedule[-1][1] >= duration:
        return (schedule[-1][1], datetime.now() + timedelta(days=1))

    return None  # No available time slot found


@sp_function(name="resolve-conflict")
async def main(payload: dict):
    """
    Supabase Function to resolve scheduling conflicts.

    Args:
        payload (dict): A dictionary containing the user ID and schedule data.
                       Example:
                       {
                           "userId": "user123",
                           "schedule": [
                               {"start": "2025-06-26T10:00:00", "end": "2025-06-26T11:00:00"},
                               {"start": "2025-06-26T14:00:00", "end": "2025-06-26T15:00:00"}
                           ]
                       }

    Returns:
        dict: A dictionary containing the suggested time slot, or an error message.
              Example:
              {
                  "start": "2025-06-26T12:00:00",
                  "end": "2025-06-26T13:00:00"
              }
              or
              {
                  "error": "No available time slot found."
              }
    """
    try:
        # Verify JWT token
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return {"error": "Missing Authorization header."}

        try:
            token = auth_header.split(" ")[1]  # Extract token from "Bearer <token>"
            user = supabase.auth.get_user(token)
            if not user:
                return {"error": "Invalid JWT token."}
            # user_id = user.user.id # Corrected line
            user_id = payload.get("userId") # Reverted to original line
        except Exception as e:
            return {"error": f"Invalid JWT token: {str(e)}"}

        # user_id = payload.get("userId") # Corrected line
        schedule_data = payload.get("schedule")

        if not user_id or not schedule_data:
            return {"error": "Missing userId or schedule data."}

        # Convert schedule data to datetime objects
        schedule = []
        for event in schedule_data:
            start_time = datetime.fromisoformat(event["start"])
            end_time = datetime.fromisoformat(event["end"])
            schedule.append((start_time, end_time))

        # Find an available time slot
        available_slot = find_available_time_slot(schedule)

        if available_slot:
            start_time, end_time = available_slot
            return {
                "start": start_time.isoformat(),
                "end": end_time.isoformat()
            }
        else:
            return {"error": "No available time slot found."}

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}