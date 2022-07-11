locals {
  identifier = var.append_workspace ? "${var.identifier}-${terraform.workspace}" : var.identifier
  default_tags = {
    Environment = terraform.workspace
    Name        = local.identifier
  }
  tags = merge(local.default_tags, var.tags)
}

###
# Backend bucket and configuration resources
###

resource "aws_s3_bucket" "frontend-bucket" {
  bucket = "${local.identifier}.com"

  tags = local.tags
}

resource "aws_s3_bucket_policy" "frontend-bucket-policy" {
  bucket = aws_s3_bucket.frontend-bucket.bucket
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${local.identifier}.com/*"
        }
    ]
}
EOF
}

resource "aws_s3_bucket_acl" "frontend-bucket-acl" {
  bucket = aws_s3_bucket.frontend-bucket.bucket
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "frontend-bucket-website" {
  bucket = aws_s3_bucket.frontend-bucket.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

###
# Intertal bucket to store photos
###

resource "aws_s3_bucket" "photos-bucket" {
  bucket = "${local.identifier}-photos"

  tags = local.tags
}

resource "aws_s3_bucket_acl" "photos-bucket-acl" {
  bucket = aws_s3_bucket.photos-bucket.bucket
  acl    = "private"
}

###
# Copying files to S3
###

resource "aws_s3_bucket_object" "backend-files" {
  for_each = fileset("./frontend/", "**")
  bucket = aws_s3_bucket.frontend-bucket.id
  key = each.value
  source = "./frontend/${each.value}"
  etag = filemd5("./frontend/${each.value}")

}

