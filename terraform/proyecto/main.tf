###
# S3 resources
###

module "s3" {
  source = "../modules/terraform-s3"

  append_workspace  = var.append_workspace
  identifier        = var.identifier
  tags              = var.tags
}


###
# Dynamodb resources
###

module "dynamodb" {
  source = "../modules/terraform-dynamodb"

  append_workspace  = var.append_workspace
  identifier        = var.identifier
  tags              = var.tags
}

###
# Lambda resources
###

module "lambda" {
  source = "../modules/terraform-lambda"

  append_workspace  = var.append_workspace
  table_emociones   = module.dynamodb.output.table-emociones.id
  table_historial   = module.dynamodb.output.table-resultado.id
  table_resultado   = module.dynamodb.output.table-resultado.id
  table_usuarios    = module.dynamodb.output.table-usuarios.id
  table_retro       = module.dynamodb.output.table-retro.id
  photos_bucket     = module.s3.output.photos-bucket.id
  backend_api       = module.api-gateway.output.backend-api.id
  identifier        = var.identifier
  accountid         = local.account_id
  role_arn          = var.role_arn
  region            = var.region
  tags              = var.tags

}

###
# API Gateway resources
###

module "api-gateway" {
  source = "../modules/terraform-api-gateway"

  append_workspace  = var.append_workspace
  lambda_dashboard  = module.lambda.output.lambda_dashboard.invoke_arn
  lambda_historial  = module.lambda.output.lambda_historial.invoke_arn
  lambda_usuarios   = module.lambda.output.lambda_usuarios.invoke_arn
  lambda_retro      = module.lambda.output.lambda_retro.invoke_arn
  lambda_apr        = module.lambda.output.lambda_apr.invoke_arn
  identifier        = var.identifier
  region            = var.region
  tags              = var.tags

}