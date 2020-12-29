import functools
from flask import jsonify, request

def convert_to_json(string):
    return jsonify(string)

def return_json(f):
    @functools.wraps(f)
    def to_json(*a, **k):
        return convert_to_json(f(*a, **k))
    return to_json