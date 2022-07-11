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