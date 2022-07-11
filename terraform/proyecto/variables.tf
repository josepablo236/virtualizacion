variable "identifier" {
  description = "Identifier for all the resources created with Terraform"
  default     = ""
  type        = string
}

variable "append_workspace" {
  description = "Boolean to verify if the workspace name is required"
  default     = true
  type        = bool
}

variable "tags" {
  description = "Tags for the resources"
  default     = {}
  type        = map(any)
}

variable "role_arn" {
  description = "IAM Role thats is going to be used for the Lambda functions"
  type        = string
}

variable "region" {
  description = "AWS Region"
  default     = "us-east-2"
  type        = string
}