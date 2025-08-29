#!/bin/bash
cd /home/kavia/workspace/code-generation/fitness-tracker-pro-155116-155125/fitness_tracker_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

