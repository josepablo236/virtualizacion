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

variable "lambda_dashboard" {
  description = "Dashboard lambda"
  default     = ""
  type        = string
}

variable "lambda_historial" {
  description = "Identifier for all the resources created with Terraform"
  default     = "Historial lambda"
  type        = string
}

variable "lambda_retro" {
  description = "Retro lambda"
  default     = ""
  type        = string
}

variable "lambda_usuarios" {
  description = "Identifier for all the resources created with Terraform"
  default     = ""
  type        = string 
}

variable "lambda_apr" {
  description = "APR lambda"
  default     = ""
  type        = string
}

variable "region" {
  description = "AWS Region"
  default     = ""
  type        = string
}