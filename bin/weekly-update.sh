#!/bin/bash

set -eu
# set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

SINCE="1 months ago"

(
  # Change to git repo root directory
  cd "$DIR/.."

  # Get all commits since then with stats
  git log --since="$SINCE" --pretty=format:"%ct|%s" --shortstat | while read -r line; do
    if [[ $line == *"|"* ]]; then
      # This is a commit line with timestamp and message
      TIMESTAMP=${line%|*}
      MESSAGE=${line#*|}
      
      # Calculate week number (integer division of timestamp by seconds in week)
      WEEK=$((TIMESTAMP / 604800))
      
    elif [[ $line == *"changed"* ]]; then
      # This is a stat line
      INSERTIONS=$(echo "$line" | grep -o '[0-9]* insertion' | cut -d' ' -f1)
      DELETIONS=$(echo "$line" | grep -o '[0-9]* deletion' | cut -d' ' -f1)
      
      # Default to 0 if no insertions/deletions
      INSERTIONS=${INSERTIONS:-0}
      DELETIONS=${DELETIONS:-0}
      
      # Print in format: week_number|timestamp|insertions|deletions|commit_message
      echo "$WEEK|$TIMESTAMP|$INSERTIONS|$DELETIONS|$MESSAGE"
    fi
  done | sort -n | awk -F'|' '
    BEGIN { 
      prev_week = 0
      total_ins = 0
      total_del = 0
      commits = ""
    }
    {
      if (prev_week != 0 && prev_week != $1) {
        # Print previous week summary
        print "Week " strftime("%F", prev_week * 604800) ":"
        print "Total insertions: " total_ins
        print "Total deletions: " total_del
        print "Commits:"
        print commits
        print "---\n"
        
        # Reset counters
        total_ins = 0
        total_del = 0
        commits = ""
      }
      
      prev_week = $1
      total_ins += $3
      total_del += $4
      commits = commits "- " $5 " (+" $3 "/-" $4 ")\n"
    }
    END {
      # Print final week
      print "Week " strftime("%F", prev_week * 604800) ":"
      print "Total insertions: " total_ins
      print "Total deletions: " total_del
      print "Commits:"
      print commits
    }'
)