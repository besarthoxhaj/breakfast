provider "aws" {
  region                  = "eu-west-2"
  shared_credentials_file = "./aws.credentials"
}

data "archive_file" "bar" {
  type        = "zip"
  source_file = "index.js"
  output_path = "index.zip"
}

resource "aws_lambda_function" "foo" {
  filename         = "index.zip"
  function_name    = "HelloWorld"
  role             = aws_iam_role.zoo.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.bar.output_base64sha256
  runtime          = "nodejs12.x"
}

resource "aws_iam_role" "zoo" {
  name = "zoo"
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [{
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Sid": "",
      "Principal": { "Service": "lambda.amazonaws.com" }
    }]
  })
}