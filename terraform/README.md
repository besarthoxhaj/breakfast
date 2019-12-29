## Terraform

```sh
brew update
brew install terraform
which terraform
# /usr/local/bin/terraform
```

Install the provider plugins, in this case AWS, then plan and deploy:

```sh
# run all commands wherever the root of the '.tf' is
terraform init
terraform plan
terraform apply
# to skip the approval prompt
terraform apply -auto-approve
```

Make sure to create an `aws.credentials` file. It should look like this:
```sh
# ./simple/aws.credentials
[default]
aws_access_key_id = AKIAK3JR1SBIXALCMABN
aws_secret_access_key = B5pJnvoBlnr54vIz5RFKb9/ba0ZnZnxZ3cLubb3K
```

## Syntax

Read the basic syntax here https://www.terraform.io/docs/configuration/index.html.

```sh
resource "aws_lambda_function" "hello" {
  filename         = "index.zip"
  function_name    = "HelloWorld"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs12.x"
}
```

## Resources
- https://www.terraform.io/docs/glossary.html
- https://www.terraform.io/docs/providers/aws/index.html
- https://github.com/trussworks/terraform-aws-lambda
- https://blog.codecentric.de/en/2019/09/aws-cdk-versus-terraform-and-serverless-framework/
- https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/
- https://jun711.github.io/aws/aws-api-gateway-invoke-lambda-function-permission/
- https://www.youtube.com/watch?v=h970ZBgKINg