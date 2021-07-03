import tweepy
import textblob
import time
#textblob.download_corpora()
from datetime import datetime
import re
import tweepy
from tweepy import OAuthHandler
from textblob import TextBlob
import matplotlib.pyplot as plt
import requests, json
from time import sleep
from dotenv import load_dotenv
import os

load_dotenv()

class TwitterClient(object):
    def __init__(self):
        consumer_key = os.getenv('CONSUMER_KEY')
        consumer_secret = os.getenv('CONSUMER_SECRET')
        access_token = os.getenv('ACCESS_TOKEN')
        access_token_secret = os.getenv('ACCESS_TOKEN_SECRET')

        try:
            self.auth = OAuthHandler(consumer_key, consumer_secret)
            self.auth.set_access_token(access_token, access_token_secret)
            self.api = tweepy.API(self.auth)
        except:
            print("Error: Authentication Failed")

    def clean_tweet(self, tweet):
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

    def get_tweet_sentiment(self, tweet):
        # create TextBlob object of passed tweet text
        analysis = TextBlob(self.clean_tweet(tweet))
        # set sentiment
        if analysis.sentiment.polarity > 0:
            return 'positive'
        elif analysis.sentiment.polarity == 0:
            return 'neutral'
        else:
            return 'negative'

    def tweet_file(self):
        self.message="Sentiment Analysis by Yash Walia"
        self.filename='SentimentAnalysis.png'
        print(self)
        self.api.update_with_media(message = self.message, filename= self.filename)

    def get_tweets(self, query, count = 10):
        '''
        Main function to fetch tweets and parse them.
        '''
        # empty list to store parsed tweets
        tweets = []

        try:
            # call twitter api to fetch tweets
            fetched_tweets = self.api.search(q = query, count = count)

            # parsing tweets one by one
            list_of_tweets = []
            for tweet in fetched_tweets:

                # empty dictionary to store required params of a tweet
                parsed_tweet = {}

                # saving text of tweet
                #tweet1 =
                #tweet1=TwitterClient.api.clean_tweet(tweet_text)
                parsed_tweet['text'] = tweet.text
                list_of_tweets.append(tweet.text)
                # saving sentiment of tweet
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)

                # appending parsed tweet to tweets list
                if tweet.retweet_count > 0:
                    # if tweet has retweets, ensure that it is appended only once
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)

            # return parsed tweets
            with open('TweetHistory.txt', 'a+') as f1:
                for tweet in list_of_tweets:
                    try:
                        f1.write(tweet)
                    except:
                        pass

            return tweets

        except tweepy.TweepError as e:
            # print error (if any)
            print("Error : " + str(e))

def save_to_file(coin, positive_tweet_percentage, negative_tweet_percentage, neutral_tweet_percentage, time, current_price, filename = "SentimentHistorical.csv"):
    with open(filename, 'a+') as  f:
        line = coin, positive_tweet_percentage, negative_tweet_percentage, neutral_tweet_percentage, time, current_price
        f.writelines(str(line) + '\n')

def getBitcoinPrice():
    URL = 'https://www.bitstamp.net/api/ticker/'
    try:
        r = requests.get(URL)
        priceFloat = float(json.loads(r.text)['last'])
        return priceFloat
    except requests.ConnectionError:
        print("Error querying Bitstamp API")

def historic_data_viz(self):
    #Load Historic Data and Visual into graph form for entire recorded amount
    historic_data_list = []
    i=0
    with open('SentimentHistorical.csv') as f1:
        lines = list(f1.readlines())
        for line in lines:
            print(line)
            data=list(line.split(','))
            print(data)
            if i==0:
                start_time=data[5]
            if i==len(f1.readlines()):
                end_time=data[5]
            historic_data_list.append(data)
            i+=1
    data_visualize(historic_data_list, start_time, end_time, self)

def trading(current_price, positive_sentiment_percent, negative_sentiment_percent):
    print("Positive Sentiment - Negative Sentiment (Net Positive)", positive_sentiment_percent-negative_sentiment_percent)
    if positive_sentiment_percent>0.3:
        #Buy
        #use Khal's Code to place order, entries & exits
        print("TEST - BUY SIGNAL")
        pass
    if negative_sentiment_percent>0.2:
        #Sell
        print("TEST - SELL SIGNAL")
        #use Khal's Code to place order, entries & exits
        pass

def data_visualize(api, list_coins, start_time, end_time):
    visualize_price = []
    name_list = []
    positive_tweet = []
    negative_tweet = []
    neutral_tweet = []
    time_list = []
    for coin in list_coins:
        print("COIN: ", coin)
        print(positive_tweet)
        print(coin[0])
        name_list.append(coin[0])
        positive_tweet.append(coin[1])
        print(coin[1])
        negative_tweet.append(coin[2])
        neutral_tweet.append(coin[3])
        time_list.append(coin[4])
        visualize_price.append(coin[5])
    #Converted to two axis on same graph - https://matplotlib.org/gallery/api/two_scales.html
    fig, ax1 = plt.subplots()

    color = 'black'
    ax1.set_xlabel('time')
    ax1.set_ylabel('Percentage', color=color)
    plt.title("Twitter Sentiment Analysis by Yash Walia")
    #ax1.plot(t, data1, color=color)
    ax1.plot(time_list, positive_tweet, 'g', label='Positive %')
    ax1.plot(time_list, negative_tweet, 'r', label='Negative %')
    ax1.plot(time_list, neutral_tweet, 'k', label = 'Neutral %')
    ax1.tick_params(axis='y', labelcolor=color)
    plt.legend()
    ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis

    color = 'blue'
    ax2.set_ylabel('Price ($)', color=color)  # we already handled the x-label with ax1
    #ax2.plot(t, data2, color=color)
    ax2.plot(time_list, visualize_price, 'b', label='Bitcoin Price (Bitstamp)')
    ax2.tick_params(axis='y', labelcolor=color)
    plt.legend()
    fig.tight_layout()  # otherwise the right y-label is slightly clipped
    """
    #print(positive_tweet)
    fig = plt.figure(1)
    plt.subplot(211)
    plt.plot(time_list, positive_tweet, 'g', label='Positive Tweet Percentage')
    plt.plot(time_list, negative_tweet, 'r', label='Negative Tweet Percentage')
    plt.plot(time_list, neutral_tweet, 'k', label = 'Neutral Tweet Percentage')
    plt.legend()
    plt.subplot(212)
    plt.plot(time_list, visualize_price, 'b', label='Bitcoin Price (Bitstamp)')
    plt.suptitle('{} Sentiment Analysis, 200 Tweets (each)\n{} - {} '.format(name_list[0], start_time, end_time))
    plt.legend()
    plt.ylabel('Percentage')
    plt.xlabel('Time')
    #plt.show()
    """
    plt.legend()
    #ax2.title('{} Sentiment Analysis, 200 Tweets (each)\n{} - {} '.format(name_list[0], start_time, end_time))
    filename='SentimentAnalysis.png' #+str(start_time).strip()+'.png'
    fig.savefig(filename)
    """
    # printing first 5 positive tweets
    print("\n\nPositive tweets:")
    for tweet in ptweets[:10]:
        print(tweet['text'])
    # printing first 5 negative tweets
    print("\n\nNegative tweets:")
    for tweet in ntweets[:10]:
        print(tweet['text'])
    """

def main(coin='Bitcoin' ,count1=1000):
    api = TwitterClient()
    start_time = str(datetime.now())
    try:
        # for i in range(0,10):
            #This For Loop controls how many data 'cycles' are collected before visualization and tweeting
        # for coin in list_coins:
        tweets = api.get_tweets(query = coin, count = count1)
        current_price = getBitcoinPrice()

        print("\n\nTime: {}".format(str(datetime.now())))
        print("Current Price: {}".format(getBitcoinPrice()))
        print("Sentiment Values for {}\nNumber of Tweets Analyzed: {}".format(coin, count1))

        ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
        positive_tweet_percentage = round(100*len(ptweets)/len(tweets),2)
        print("Positive tweets percentage: {} %".format(positive_tweet_percentage))

        ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']
        negative_tweet_percentage = round(100*len(ntweets)/len(tweets),2)
        print("Negative tweets percentage: {} %".format(negative_tweet_percentage))

        neutral_tweet_percentage = round(100*(len(tweets) - len(ntweets) - len(ptweets))/len(tweets),2)
        print("Neutral tweets percentage: {} %".format(neutral_tweet_percentage))

        list_coin_val = {
            "name": coin, 
            "postp": positive_tweet_percentage, 
            "negtp": negative_tweet_percentage, 
            "neutp": neutral_tweet_percentage, 
            "checkedAt": str(datetime.now()), 
            "curp": current_price,
            "num": count1,
        }

            # save_to_file(coin, positive_tweet_percentage, negative_tweet_percentage, neutral_tweet_percentage, datetime.now(), current_price, "SentimentHistorical.csv")
            # trading(current_price, positive_tweet_percentage, negative_tweet_percentage)    #used for Trading Signals
        end_time = str(datetime.now())
        print("**************")
        print(list_coin_val, start_time, end_time)
        return (list_coin_val)
    except:
        print("ERROR - COLLECTING DATA")
    # try:
    #     data_visualize(api, list_coin_val, start_time, end_time)
    #     #historic_data_viz(api)
    # except:
    #     print("ERROR - COLLECTING DATA")

if __name__ == '__main__':
    main()