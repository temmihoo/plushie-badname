#!/bin/sh

if [ -z $1 ]
then
    sleep_period=0
else
    sleep_period=$1
fi

if [ -n "${DEBUG}" ]
then
    client="false"
else
    client="node client.js"
fi

failures=0

light_test () {
    colour=$(printf "%03d %03d %03d\n" $1 $2 $3)
    testname=$4
    send_coap_colour ${colour} ${testname}
    ask_user_success_status ${colour} ${testname}
    sleep ${sleep_period}
}

send_coap_colour () {
    echo ${colour}
    echo ${colour} | ${client}
    if [ $? -eq 0 ]
    then
        eval ${testname}_test_exec="OK"
    else
        eval ${testname}_test_exec=$?
        failures=$((${failures} + 1))
    fi
}

ask_user_success_status () {
    cat <<EOT
Test ${testname}:
    The light should be coloured $1 $2 $3
    if it is, please press enter

    In case of any failure, type anything and press enter
EOT
    read string
    if [ -z ${string} ]
    then
        eval ${testname}_test_human="OK"
    else
        eval ${testname}_test_human=$string
        failures=$((${failures} + 1))
    fi
}

report () {
    tests=$@
    for testname in ${tests}
    do
        test_exec=${testname}_test_exec
        test_human=${testname}_test_human
        cat <<EOT
Test ${testname}
  return code: ${!test_exec}
  human evaluation: ${!test_human}
EOT
    done
    echo "Total number of failures: ${failures}"
}

light_test 255 255 255 White
light_test 255 050 100 Panther
light_test 255 000 000 Red
light_test 000 255 000 Green
light_test 000 000 255 Blue
light_test 000 000 000 Black

report White Panther Red Green Blue Black

exit ${failures}
