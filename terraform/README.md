## Terraform

```sh
brew update
brew install terraform
which terraform
# /usr/local/bin/terraform
```

Install the provider plugins, in this case AWS, then plan and deploy:

```sh
terraform init
terraform plan
terraform apply
```

Make sure to create an `aws.credentials` file. It should look like this:
```sh
# ./simple/aws.credentials
[default]
aws_access_key_id = AKIAK3JR1SBIXALCMABN
aws_secret_access_key = B5pJnvoBlnr54vIz5RFKb9/ba0ZnZnxZ3cLubb3K
```

## Resources
- https://www.terraform.io/docs/glossary.html
- https://www.terraform.io/docs/providers/aws/index.html