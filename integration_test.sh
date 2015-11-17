#!/bin/sh

sleep_period=2

send_coap_colour () {
    echo $colour
    echo $colour | node client.js
    eval test_${testname}_exec=$?
}

ask_user_success_status () {
    cat <<EOT
    The light should be coloured at $1
    if it is, please press enter
    
    In case of any failure, type anything and press enter
EOT
    read string
    eval test_${testname}_human=$?
}

light_test () {
    colour=$(printf "%03d %03d %03d\n" $1 $2 $3)
    testname=$4
    send_coap_colour $colour $testname
    ask_user_success_status $colour $testname
    sleep $sleep_period
}

report () {
    testname=$1
    eval exec=test_${testname}_exec
    eval human=test_${testname}_human
    cat <<EOT
test $testname
  return code: $test_${testname}_exec
  human evaluation: $test_${testname}_human
EOT
}

light_test 255 255 255 first
light_test 255 050 100 second
light_test 255 000 000 third
light_test 000 255 000 fourth
light_test 000 000 255 fifth

send_coap_colour "255 050 100" puppu

for i in first second third fourth fifth
do
    report $i
done
