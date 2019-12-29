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
  function_name    = "HelloPlayground"
  filename         = "index.zip"
  handler          = "index.handler"
  source_code_hash = data.archive_file.bar.output_base64sha256
  runtime          = "nodejs12.x"
  role             = aws_iam_role.FooRole.arn
}

resource "aws_iam_role" "FooRole" {
  name = "playground-role"
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Effect": "Allow",
        "Principal": {
          "Service": [
            "lambda.amazonaws.com",
            "apigateway.amazonaws.com"
          ]
        }
      }
    ]
  })
}

resource "aws_iam_policy" "BarPolicy" {
  name = "playground-policy"
  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [ "lambda:InvokeFunction" ],
        "Resource": [ aws_lambda_function.foo.arn ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attachBarPolicyToFooRole" {
  role       = aws_iam_role.FooRole.name
  policy_arn = aws_iam_policy.BarPolicy.arn
}

resource "aws_api_gateway_rest_api" "FooApi" {
  name        = "Foo"
  description = "Lorem ipsum"
  endpoint_configuration {
    types = [ "REGIONAL" ]
  }
}

resource "aws_api_gateway_resource" "BarPath" {
  rest_api_id = aws_api_gateway_rest_api.FooApi.id
  parent_id   = aws_api_gateway_rest_api.FooApi.root_resource_id
  path_part   = "bar"
}

resource "aws_api_gateway_method" "BarPathMethod" {
  rest_api_id   = aws_api_gateway_rest_api.FooApi.id
  resource_id   = aws_api_gateway_resource.BarPath.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "BarPathMethodIntegration" {
  rest_api_id = aws_api_gateway_rest_api.FooApi.id
  resource_id = aws_api_gateway_method.BarPathMethod.resource_id
  http_method = aws_api_gateway_method.BarPathMethod.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.foo.invoke_arn
}

resource "aws_api_gateway_deployment" "FooApiDeploy" {
  depends_on = [ aws_api_gateway_integration.BarPathMethodIntegration ]
  rest_api_id = aws_api_gateway_rest_api.FooApi.id
  stage_name  = "test"
}

output "FooApiDeployUrl" {
  value = aws_api_gateway_deployment.FooApiDeploy.invoke_url
}