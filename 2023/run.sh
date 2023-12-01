#!/bin/bash

day=$1

if ((day > 0 && day < 26)); then
    zeroPaddedDay=$(printf "%02d" $day)
	script="$zeroPaddedDay/answer.ts"
	if [ -f $script ]; then
		cd "$zeroPaddedDay"
		echo "Running day $day..."
		echo ""
		ts-node answer.ts
	else
	   echo "No file exists for day $day yet."
	fi
else
	echo "Please provide a valid day to run (1-25)."
	echo "Example: ./run.sh 3"
fi
