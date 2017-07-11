# nodejsKmsS3Api

Simple code used in my hands on labs on https:www.securitysandman.com. 

Basic node.js express api which consumes Passwords rproperties from the body object and encrypts them via AWS KMS and then uploads the ecnrypted ciphertext blob to S3. 

Also included in a simple web UI to test posts in the browser outside of Postman. 

# Files

package.json has the instuctions to pull this node app down and grab all the packages all at once. 

npm module includes all modules used in the build.

Primary modules are Express, body-parser and aws-sdk 

# Psuedo code

Load your libs
Construct the app service / middlware layer
Handle get requsts rto the root path and serve up index.html 
Handle posts methods and route to /post API
/post API consume the body and parses for the Password string
Password string and a number of other arguments are fed into the encryption function 
Encrypted ciphertext is retuned and
construct an S3 object
take the ciphertext and string it out and turn it into an object or file
Put the object on aws S3
Use AES256 server side encryption on S3
return a response that the upload was successful 
end

# Warning

This is not production ready
This has not been tested, it does not validate inputs use NPM validator for that and regex expressions server side
Remember this model only supports 4KB payloads to be encrypted
I'm not responsible for what you do with this code. Use at our own risk. 


