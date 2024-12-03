# 1 Get the first argument
day_number=$1

# 2 Validate that the argument is a number between 1 and 25
if ! [[ $day_number =~ ^[0-9]+$ ]]; then
    echo "The argument must be a number"
    exit 1
fi

if [ $day_number -lt 1 ] || [ $day_number -gt 25 ]; then
    echo "The argument must be a number between 1 and 25"
    exit 1
fi

# Format day number with leading zero if needed
padded_day=$(printf "%02d" $day_number)

# 3 If that day doesn't exist, Copy the content of ./day-template to ./day-XX where XX is the number passed as argument
if [ ! -d "./day-$padded_day" ]; then
    cp -r ./day-template "./day-$padded_day"
    echo "Day $padded_day created"
else
    echo "Day $padded_day already exists"
fi
