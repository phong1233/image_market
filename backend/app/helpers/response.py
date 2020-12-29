def response_code_and_message(code, msg=None):
    if code == 200:
        return {
            'responseCode': 200,
            'responseMessage': msg
        }
    if code == 400:
        return {
            'responseCode': 400,
            'responseMessage': 'Bad Request'
        }
    if code == 404:
        return {
            'responseCode': 404,
            'responseMessage': 'Not Found'
        }
    if code == 409:
        return {
            'responseCode': 409,
            'responseMessage': msg
        }
    if code == 500:
        return {
            'responseCode': 500,
            'responseMessage': 'Server Error'
        }
    if code:
        return {
            'reponseCode': code,
            'responseMessage': msg
        }
    return {
        'responseMessage': 'No action available'
    }
