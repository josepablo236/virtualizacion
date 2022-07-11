locals {
  identifier = var.append_workspace ? "${var.identifier}-${terraform.workspace}" : var.identifier
  default_tags = {
    Environment = terraform.workspace
    Name        = local.identifier
  }
  tags = merge(local.default_tags, var.tags)
}

###
# Emociones table
###

resource "aws_dynamodb_table" "emociones" {
  name           = "${local.identifier}-emociones"
  billing_mode   = "PROVISIONED"
  hash_key       = "id"
  write_capacity = 1
  read_capacity  = 1 

  attribute {
    name = "id"
    type = "S"
  }

  tags = local.tags
}

###
# Resultado table
###

resource "aws_dynamodb_table" "resultado" {
  name           = "${local.identifier}-resultado"
  billing_mode   = "PROVISIONED"
  hash_key       = "email"
  write_capacity = 1
  read_capacity  = 1 

  attribute {
    name = "email"
    type = "S"
  }

  tags = local.tags
}

###
# Retroalimentacion table
###

resource "aws_dynamodb_table" "retroalimentacion" {
  name           = "${local.identifier}-retroalimentacion"
  billing_mode   = "PROVISIONED"
  hash_key       = "id"
  write_capacity = 1
  read_capacity  = 1 

  attribute {
    name = "id"
    type = "S"
  }

  tags = local.tags
}

###
# Usuarios table
###

resource "aws_dynamodb_table" "usuarios" {
  name           = "${local.identifier}-usuarios"
  billing_mode   = "PROVISIONED"
  hash_key       = "email"
  write_capacity = 1
  read_capacity  = 1 
  
  attribute {
    name = "email"
    type = "S"
  }


  tags = local.tags
}