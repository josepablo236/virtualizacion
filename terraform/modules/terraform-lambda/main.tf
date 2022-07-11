locals {
  identifier = var.append_workspace ? "${var.identifier}-${terraform.workspace}" : var.identifier
  default_tags = {
    Environment = terraform.workspace
    Name        = local.identifier
  }
  tags = merge(local.default_tags, var.tags)
}

###
# ZIP files creation
###

data "archive_file" "zip" {
  type        = "zip"
  source_dir = "${path.module}/source_code/"
  output_path = "${path.module}/index.zip"
}

# data "archive_file" "apr-zip" {
#   type        = "zip"
#   source_dir = "${path.module}/source_code_apr/"
#   output_path = "${path.module}/index-apr.zip"
# }

# data "archive_file" "dashboard-zip" {
#   type        = "zip"
#   source_dir = "${path.module}/source_code_dashboard/"
#   output_path = "${path.module}/index-dashboard.zip"
# }

# data "archive_file" "historial-zip" {
#   type        = "zip"
#   source_dir = "${path.module}/source_code_historial/"
#   output_path = "${path.module}/index-historial.zip"
# }

# data "archive_file" "retro-zip" {
#   type        = "zip"
#   source_dir = "${path.module}/source_code_retro/"
#   output_path = "${path.module}/index-retro.zip"
# }

# data "archive_file" "usuarios-zip" {
#   type        = "zip"
#   source_dir = "${path.module}/source_code_usuarios/"
#   output_path = "${path.module}/index-usuarios.zip"
# }

###
# Lambdas creation
###

resource "aws_lambda_function" "apr" {
  filename         = "${path.module}/index.zip"
  function_name    = "${local.identifier}-apr"
  role             = aws_iam_role.role.arn
  timeout          = "10"
  handler          = "apr.lambda_handler"
  source_code_hash = data.archive_file.zip.output_base64sha256
  runtime          = "python3.9"

  environment {
    variables = {
        BUCKET_NAME = var.photos_bucket
    }
  }

  tags = local.tags
}

resource "aws_lambda_function" "dashboard" {
  filename         = "${path.module}/index.zip"
  function_name    = "${local.identifier}-dashboard"
  role             = aws_iam_role.role.arn
  timeout          = "10"
  handler          = "dashboard.handler"
  source_code_hash = data.archive_file.zip.output_base64sha256
  runtime          = "nodejs16.x"

  environment {
    variables = {
        REGION = var.region
        TABLE_USUARIOS = var.table_usuarios
        TABLE_HISTORIAL = var.table_historial
        TABLE_EMOCIONES = var.table_emociones
        TABLE_RETRO = var.table_retro
    }
  }

  tags = local.tags
}

resource "aws_lambda_function" "historial" {
  filename         = "${path.module}/index.zip"
  function_name    = "${local.identifier}-historial"
  role             = aws_iam_role.role.arn
  timeout          = "10"
  handler          = "historial.handler"
  source_code_hash = data.archive_file.zip.output_base64sha256
  runtime          = "nodejs16.x"

  environment {
    variables = {
        REGION = var.region
        TABLE_RESULTADO = var.table_resultado
        TABLE_EMOCIONES = var.table_emociones
    }
  }

  tags = local.tags
}

resource "aws_lambda_function" "retro" {
  filename         = "${path.module}/index.zip"
  function_name    = "${local.identifier}-retro"
  role             = aws_iam_role.role.arn
  timeout          = "10"
  handler          = "retro.handler"
  source_code_hash = data.archive_file.zip.output_base64sha256
  runtime          = "nodejs16.x"

  environment {
    variables = {
        REGION = var.region
        TABLE_RETRO = var.table_retro

    }
  }

  tags = local.tags
}

resource "aws_lambda_function" "usuarios" {
  filename         = "${path.module}/index.zip"
  function_name    = "${local.identifier}-usuarios"
  role             = aws_iam_role.role.arn
  timeout          = "10"
  handler          = "usuarios.handler"
  source_code_hash = data.archive_file.zip.output_base64sha256
  runtime          = "nodejs16.x"

  environment {
    variables = {
        REGION = var.region
        TABLE_USUARIOS = var.table_usuarios
    }
  }

  tags = local.tags
}

# Lambda permissions

resource "aws_lambda_permission" "lambda-dashboard" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.dashboard.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:${var.region}:${var.accountid}:${var.backend_api}/*/*"
}

resource "aws_lambda_permission" "lambda-historial" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.historial.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.region}:${var.accountid}:${var.backend_api}/*/*"
}

resource "aws_lambda_permission" "lambda-retro" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.retro.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.region}:${var.accountid}:${var.backend_api}/*/*"
}

resource "aws_lambda_permission" "lambda-usuarios" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.usuarios.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.region}:${var.accountid}:${var.backend_api}/*/*"
}

resource "aws_lambda_permission" "lambda-apr" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.apr.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.region}:${var.accountid}:${var.backend_api}/*/*"
}

resource "aws_iam_role" "role" {
  name               = "${local.identifier}-lambda-role"
  assume_role_policy = file("${path.module}/policies/lambda-role.json")
}

resource "aws_iam_role_policy" "policy" {
  policy = templatefile("${path.module}/policies/lambda-policy.json", {
    AccountId = var.accountid
    Region = var.region
  })
  role   = aws_iam_role.role.id
}