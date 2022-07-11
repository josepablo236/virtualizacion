output "output" {
  value = {
    frontend-bucket = aws_s3_bucket.frontend-bucket
    photos-bucket   = aws_s3_bucket.photos-bucket
  }
}