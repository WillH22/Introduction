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

elmo = ('Elmo', 5, ['hugging', 'being nice'])
sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])


def friend_date(a, b):
    for stuff in a[-1]:
        for other in b[-1]:
            if stuff == other:
                return True

    else:
        return False


"""This function takes 2 tuples with a list of hobbies and returns true if they have 1 in common"""


def triple_and_filter(nums):
    newnums = []
    zeron = 0
    for num in nums:
        if num % 4 == 0:
            zeron = num * 3
            newnums.append(zeron)
    return newnums


"""This function takes in a list of numbers and takes the numbers that are divisible by 4 and multiplies them by 3 and returns the new numbers"""


names = [
    {'first': 'Ada', 'last': 'Lovelace'},
    {'first': 'Grace', 'last': 'Hopper'},
]


def extract_full_names(people):
    peopleslist = []
    for person in people:
        peopleslist.append(f"{person['first']} {person['last']}")
    return peopleslist


"""This function takes a list of people's names and returns their first and last names"""


def sum_floats(nums):
    zeron = 0

    for num in nums:
        if isinstance(num, float):
            zeron += num
    return zeron


"""This functions takes a list and checks if any are floats then adds them and returns the sum"""


def list_check(lst):
    for stuff in lst:
        if bool(isinstance(stuff, list)) == False:
            return False
    else:
        return True


"""This checks if the list only contains lists"""

lst = [1, 2, 3, 4, 5]


def remove_every_other(lst):
    num = 0
    newlst = []
    while num <= len(lst):
        newlst.append(lst[num])
        num += 2
    return newlst


"""This takes in a list and returns a list with every other item from the original list"""


def sum_pairs(nums, goal):
    n = len(nums)

    for i in range(n):
        for j in range(i):
            if nums[i] + nums[j] == goal:
                return (nums[j], nums[i])

    return ()


"""This function takes in a list of numbers and returns a pair that sums up to the goal"""


def vowel_count(phrase):
    count = {}
    vowels = 'aeiou'
    for letter in phrase.lower():
        for vowel in vowels:
            if letter == vowel:
                if letter not in count:
                    count[letter] = 0
                count[letter] += 1
    return count


"""This function takes in a string and returns a dictionary of vowels"""


def titleize(phrase):
    lower = phrase.lower()
    return lower.title()


"""This function takes in a string and returns the string with the first letter of every word capitalized"""


def find_factors(num):
    x = range(1, num + 1)
    lst = []

    for nums in x:
        if num % nums == 0:
            lst.append(nums)
    return lst


"""Takes a number and returns all factors of that number"""


# def includes(collection, sought, start=None):
#     if isinstance(collection, dict):
#         return sought in collection.values()

#     if start is None or isinstance(collection, set):
#         return sought in collection

#     return sought in collection[start:]


def includes(collection, sought, start=None):
    if isinstance(collection, dict):
        for items in collection.values():
            if items == sought:
                return True

        return False

    if isinstance(collection, set):
        for something in collection:
            if something == sought:
                return True

        return False

    for everything in collection[start:]:
        if everything == sought:
            return True

    return False


"""This function takes a list/tuples/dictionaries/sets as a collection and searches for the sought item returning True or False if the item is in the collection"""


def repeat(phrase, num):
    if not isinstance(num, int) or 0 > num:
        return None
    return phrase * num


"""This function takes a phrase and a number and returns the phrase repeated that number of times"""


def truncate(phrase, n):
    if n >= 3:
        if len(phrase) >= n:
            return f"{phrase[0:n - 3]}..."
        elif len(phrase) < n:
            return phrase
    elif n < 3:
        return 'truncation must be at least 3 characters'


"""This function takes in a phrase and a number and returns a truncated at the number of characters version fo the phrase"""


def two_list_dictionary(keys, values):
    diction = {}

    for x, y in enumerate(keys):
        if x < len(values):
            diction[y] = values[x]
        else:
            None
    return diction


"""This function takes in 2 lists, keys and values and returns a dictionary"""

nums = [1, 2, 3, 4]


def sum_range(nums, start=0, end=None):
    zeron = 0

    if end is not None and end > len(nums):
        for num in nums[start:]:
            zeron += num
        return zeron
    else:
        for num in nums[start:end + 1]:
            zeron += num
        return zeron


"""this takes in a list of numbers and adds them depending on where it starts and ends and returns the sum of those numbers"""


def same_frequency(num1, num2):
    str_num1 = str(num1)
    str_num2 = str(num2)
    freq1 = {}
    freq2 = {}

    for digit in str_num1:
        freq1[digit] = freq1.get(digit, 0) + 1

    for digit in str_num2:
        freq2[digit] = freq2.get(digit, 0) + 1

    return freq1 == freq2


"""This takes in 2 long numbers and see if they have the same amount and exact same numbers in the number"""


def two_oldest_ages(ages):
    oldest = None
    second_oldest = None

    for age in ages:
        if oldest is None or age > oldest:
            second_oldest = oldest
            oldest = age
        elif age != oldest and (second_oldest is None or age > second_oldest):
            second_oldest = age

    return (second_oldest, oldest)


"""This takes a bunch of ages and returns 2 distinctive oldest ages"""


def find_the_duplicate(nums):
    num_count = {}

    for num in nums:
        if num in num_count:
            return num
        else:
            num_count[num] = 1

    return None


"""This takes some numbers and returns the duplicate number"""


m2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

m1 = [
    [1,   2],
    [30, 40],
]


def sum_up_diagonals(matrix):
    n = len(matrix)
    diagonal_sum = 0

    for i in range(n):
        for j in range(n):
            if i == j:
                diagonal_sum += matrix[i][j]
            if i + j == n - 1:
                diagonal_sum += matrix[i][j]

    return diagonal_sum


"""This takes in a matrix? of numbers and returns the sum of numbers that were diagonal"""


def min_max_keys(d):
    min_key = None
    max_key = None

    for key in d:
        if min_key is None or key < min_key:
            min_key = key
        if max_key is None or key > max_key:
            max_key = key

    return min_key, max_key


"""This takes a dictionary and returns the min key and max key"""


def find_greater_numbers(nums):
    count = 0
    n = len(nums)

    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] < nums[j]:
                count += 1

    return count


"""This takes a bunch of numbers and returns how many times a number was followed by a greater number"""
