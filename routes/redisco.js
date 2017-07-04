/**
 * Created by Nani on 7/4/2017.
 */
var redis=require('redis');
var client=redis.createClient(6379,'127.0.0.1');

client.on('error',function (error,success)
    {

        console.log("error establishing connection with redis");

    }
);
exports.exposeConnection=function () {
    return client;
}