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
  default     = ""
  type        = string
}

variable "photos_bucket" {
  description = "Bucket that stores the photos"
  default     = ""
  type        = string
}

variable "region" {
  description = "AWS Region"
  default     = ""
  type        = string
}

variable "table_emociones" {
  description = "Table that stores information about emotions"
  default     = ""
  type        = string
}

variable "table_historial" {
  description = "Table that stores the history of emotions"
  default     = ""
  type        = string
}

variable "table_retro" {
  description = "Table that stores the feedback"
  default     = ""
  type        = string
}

variable "table_usuarios" {
  description = "Table that stores de users"
  default     = ""
  type        = string
}

variable "table_resultado" {
  description = "Table that stores de results"
  default     = ""
  type        = string
}

variable "backend_api" {
  description = "API id to give permissions to the Lambda Function"
  default     = ""
  type        = string
}

variable "accountid" {
  description = "AWS Account id"
  default     = ""
  type        = string
}