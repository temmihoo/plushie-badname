#!/bin/sh

while true; do
    colour=""
    for i in {1..3};
        do
            col=$((RANDOM %= 255))
            colour=$colour$col" "
        done
    printf "%s" "$colour"
    printf "\n\n"
    echo $colour | node client.js
    sleep 5
done

