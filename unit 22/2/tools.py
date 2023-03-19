def product(a, b):
    return a * b


"""This multiplies 2 numbers given and returns the product"""


def weekday_name(day_of_week):
    days = ['Sunday', 'Monday', 'Tuesday',
            'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return days[day_of_week - 1]


"""This function will return the day of the week depending on the number from 1-7"""


def last_element(lst):
    lst.reverse()
    return lst[0]


"""This function reverses the list and returns what should be the last element in the original list"""


def number_compare(a, b):
    if a > b:
        print('First is greater')
    elif b > a:
        print('Second is greater')
    elif a == b:
        print('Numbers are equal')


"""this function compares 2 numbers and returns whichever is greater, unless they're both equal"""


def reverse_string(phrase):
    return phrase[::-1]


"""This function reverses the string"""


def single_letter_count(word, letter):
    count = 0
    for lett in word:
        if lett == letter:
            count += 1
    return count


"""this function counts how many of a chosen letter is in a string"""


def multiple_letter_count(phrase):
    count = {}
    for letter in phrase:
        if letter not in count:
            count[letter] = 0
        count[letter] += 1
    return count


"""this function counts how many of each letter is in the string"""


def list_manipulation(lst, command, location, value=None):
    lst2 = lst.copy()
    lst2.reverse()

    if command == 'remove':
        if location == 'beginning':
            return lst.pop(0)
        elif location == 'end':
            return lst.pop()
    elif command == 'add':
        if location == 'beginning':
            lst2.append(value)
            lst2.reverse()
            return lst2
        elif location == 'end':
            lst.append(value)
            return lst
    else:
        return 'invalid input'


"""This function takes a list, command, and location, and possible a value and returns a list with the removed element or an added element."""


def is_palindrome(phrase):
    sent = phrase.lower()[::-1].replace(' ', '')

    return phrase.lower().replace(' ', '') == sent


"""This function takes a string and returns true or false if it can be read normally and backwards"""


def frequency(lst, search_term):

    return lst.count(search_term)


"""This function takes a list and a term to search for in the list and returns how many times that term shows up in the list"""


def flip_case(phrase, to_swap):
    newstr = ""

    for letter in phrase:
        if letter.lower() == to_swap:
            letter = letter.swapcase()
        newstr += letter

    return newstr


"""This function takes a string and flips casing in the string that matches the letter entered"""


def multiply_even_numbers(nums):
    mult = 1
    for num in nums:
        if num % 2 == 0:
            mult *= num
    return mult


"""This function takes in a list of nums and only multiplies the evens together and returns the product"""


def capitalize(phrase):
    return phrase.capitalize()


"""This function takes in a string and returns it with the very first letter capitalized"""


def compact(lst):
    newlst = []
    for stuff in lst:
        if bool(stuff) == True:
            newlst.append(stuff)
    return newlst


"""This function takes a list and returns a new list of items that are True and not Falsey"""


def intersection(l1, l2):
    l3 = []
    for stuff in l1:
        for other in l2:
            if stuff == other:
                l3.append(stuff)
    return l3


"""This function takes 2 lists and returns a list of shared elements between the two"""


def partition(lst, fn):
    lst1 = []
    lst2 = []

    def is_even(num):
        return num % 2 == 0

    def is_string(el):
        return isinstance(el, str)

    if fn == 'is_even':
        for nums in lst:
            if is_even(nums) == True:
                lst1.append(nums)
            elif is_even(nums) == False:
                lst2.append(nums)
    elif fn == 'is_string':
        for elements in lst:
            if is_string(elements) == True:
                lst1.append(elements)
            elif is_string(elements) == False:
                lst2.append(elements)
    return [lst1, lst2]


# def partition_solution(lst, fn):
#     true_list = []
#     false_list = []

#     for val in lst:
#         if fn(val):
#             true_list.append(val)
#         else:
#             false_list.append(val)

#     return [true_list, false_list]


# def is_string(el):
#     return isinstance(el, str)


# def is_even(num):
#     return num % 2 == 0
"""This function takes a list and a callback and returns 2 lists, 1 that has elements that came out true and the other false"""


def mode(nums):
    frequent = 0

    for num in nums:
        if frequent < nums.count(num):
            frequent = nums.count(num)
    return num


"""This function takes a list of numbers and returns the most common number in that list"""


def calculate(operation, a, b, make_int=False, message='The result is'):
    add = a + b
    mult = a * b
    sub = a - b
    div = a / b
    endnum = 0

    if make_int == True:
        if operation == 'add':
            endnum = add
            return f'{message} {int(endnum)}'
        elif operation == 'subtract':
            endnum = sub
            return f'{message} {int(endnum)}'
        elif operation == 'divide':
            endnum = div
            return f'{message} {int(endnum)}'
        elif operation == 'multiply':
            endnum = mult
            return f'{message} {int(endnum)}'
        else:
            return None

    elif make_int == False:
        if operation == 'add':
            endnum = add
            return f'{message} {endnum}'
        elif operation == 'subtract':
            endnum = sub
            return f'{message} {endnum}'
        elif operation == 'divide':
            endnum = div
            return f'{message} {endnum}'
        elif operation == 'multiply':
            endnum = mult
            return f'{message} {endnum}'
        else:
            return None


"""This function takes an operation and 2 numbers and returns the final solution along with a message"""
