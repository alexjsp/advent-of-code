#!/bin/bash

day=$1

if ((day > 0 && day < 26)); then
	script="day$day/run.sh"
	if [ -f $script ]; then
		cd "day$day"
	    echo "Running day $day."
	    ./run.sh
	else
	   echo "No run script exists for day $day yet."
	fi
else
	echo "Please provide a valid day to run (1-25)."
	echo "Example: ./run.sh 3"
fi
