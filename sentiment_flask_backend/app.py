from flask import Flask, request, jsonify
import json
import pickle
import numpy as np

app = Flask(__name__)

def checkRatingAndFeedbackMatching(rate, sentimentValue):
    if sentimentValue == "positive" and rate == 1:
        return "reject"
    elif sentimentValue == "positive" and rate == 2:
        return "reject"
    elif sentimentValue == "NEU" and rate == 1:
        return "reject"
    elif sentimentValue == "NEU" and rate == 2:
        return "reject"
    elif sentimentValue == "negative" and rate == 5:
        return "reject"
    elif sentimentValue == "negative" and rate == 4:
        return "reject"
    elif sentimentValue == "negative" and rate == 3:
        return "reject"
    else:
        return "accept"


def checkingSentimentValue(data):
    ## loading the vectorizer
    filename='sentiment_pred_vectorizer'
    loaded_vectorizer = pickle.load(open(filename,'rb'))

    #vectorizing the input
    user_reviews_array=np.array([data])
    user_review_vector = loaded_vectorizer.transform(user_reviews_array)

    #loading the model
    filename='sentiment_pred_model'
    loaded_model = pickle.load(open(filename,'rb'))
    prediction = loaded_model.predict(user_review_vector)
    return prediction




@app.route("/sentiment", methods = ["POST"])
def feedbackValidation():
    #initializing arguments to parameters
    rate = request.json['rate']
    feedback = request.json['feedback']
    
    #checking the sentiment value
    prediction = checkingSentimentValue(feedback)
    sentimentValue = prediction[0]

    #checking the final decision
    finalDisition = checkRatingAndFeedbackMatching(rate, sentimentValue)
    finalObject = {"sentimentValue": sentimentValue, "finalDisition": finalDisition}

    #convert to JSON
    finalJSONObject = json.dumps(finalObject)
    print(finalJSONObject)
    return finalJSONObject
    

def checkingSentimentValueBuddy(data):
    ## loading the vectorizer
    filename='sentiment_pred_vectorizer'
    loaded_vectorizer = pickle.load(open(filename,'rb'))
    
    # vectorizing the input
    user_reviews_array=np.array(data)
    user_review_vector = loaded_vectorizer.transform(user_reviews_array)

    #loading the model
    filename='sentiment_pred_model'
    loaded_model = pickle.load(open(filename,'rb'))
    prediction = loaded_model.predict(user_review_vector)
    return prediction


@app.route("/buddy", methods = ["POST"])
def buddyCheck():
    #initializing arguments to parameters
    feedback = request.json['feedback']
    # print(feedback)
    sentimentValues = checkingSentimentValueBuddy(feedback)
    valueList = sentimentValues.tolist()
    json_str = json.dumps(valueList)
    print(json_str)
    print(type(json_str))
    
    
    return json_str


if __name__ == "__main__":
    app.run()
