def count_up(start, stop):
    while start <= stop:
        print(start)
        start += 1

    print('Stopped')


def in_range(nums, lowest, highest):
    for num in nums:
        if num >= lowest and num <= highest:
            print(f'{num} fits')


def sum_nums(nums):
    summed = 0
    for num in nums:

        summed += num
    print(f'Your grand total is {summed}!!!')


def any7(nums):

    for num in nums:
        if num == 7:
            return True

    return False


def convert_temp(unit_in, unit_out, temp):
    Fahr = (temp * 9/5) + 32
    Cels = (temp - 32) * 5/9

    if unit_in == 'c' and unit_out == 'f':
        return Fahr
    elif unit_in == 'f' and unit_out == 'c':
        return Cels
    elif unit_in == 'f' and unit_out == 'f' or unit_in == 'c' and unit_out == 'c':
        return temp
    else:
        print('Invalid unit, only f or c are acceptable units')


# def print_upper_words(words):
#     capped = words.lower()
#     newstr = ""

#     for word in capped:
#         if word.startswith('e') == True:
#             newstr = "".join(word)
#         return newstr

#     else:
#         return 'no words start with e'

def print_upper_words(words, letters):
    """the function runs through a list of words, checking whether any of the words starts with one of the letters included in a list of letters, the result is the applicable words being printed"""

    for word in words:
        for letter in letters:
            if word.lower().startswith(letter.lower()) == True:
                print(word.upper())
