locals {
  identifier = var.append_workspace ? "${var.identifier}-${terraform.workspace}" : var.identifier
  default_tags = {
    Environment = terraform.workspace
    Name        = local.identifier
  }
  tags = merge(local.default_tags, var.tags)
}

###
# Backend API Creation
###

resource "aws_api_gateway_rest_api" "backend-api" {
  name        = "${local.identifier}-backend"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  description = "API para el proyecto de Virtualización"
}

resource "aws_api_gateway_api_key" "api-key" {
  name = "${local.identifier}-key"
}

resource "aws_api_gateway_deployment" "backend-deployment" {
  rest_api_id = aws_api_gateway_rest_api.backend-api.id
  stage_name  = terraform.workspace

  depends_on = [
    aws_api_gateway_integration.integration-dashboard-get,
    aws_api_gateway_integration.integration-dashboard-options,
    aws_api_gateway_integration.integration-emociones-get,
    aws_api_gateway_integration.integration-emociones-options,
    aws_api_gateway_integration.integration-historial-get,
    aws_api_gateway_integration.integration-historial-post,
    aws_api_gateway_integration.integration-historial-options,
    aws_api_gateway_integration.integration-retro-post,
    aws_api_gateway_integration.integration-retro-options,
    aws_api_gateway_integration.integration-users-post,
    aws_api_gateway_integration.integration-users-get,
    aws_api_gateway_integration.integration-users-options,
  ]
}

###
# API resources
###

resource "aws_api_gateway_resource" "dashboard" {
  rest_api_id = aws_api_gateway_rest_api.backend-api.id
  parent_id   = aws_api_gateway_rest_api.backend-api.root_resource_id
  path_part   = "dashboard"
}

resource "aws_api_gateway_resource" "emociones" {
  rest_api_id = aws_api_gateway_rest_api.backend-api.id
  parent_id   = aws_api_gateway_rest_api.backend-api.root_resource_id
  path_part   = "emociones"
}

resource "aws_api_gateway_resource" "historial" {
  rest_api_id = aws_api_gateway_rest_api.backend-api.id
  parent_id   = aws_api_gateway_rest_api.backend-api.root_resource_id
  path_part   = "historial"
}

resource "aws_api_gateway_resource" "retro" {
  rest_api_id = aws_api_gateway_rest_api.backend-api.id
  parent_id   = aws_api_gateway_rest_api.backend-api.root_resource_id
  path_part   = "retro"
}

resource "aws_api_gateway_resource" "users" {
  rest_api_id = aws_api_gateway_rest_api.backend-api.id
  parent_id   = aws_api_gateway_rest_api.backend-api.root_resource_id
  path_part   = "users"
}

###
# API methods
###

# dashboard 
resource "aws_api_gateway_method" "dashboard-get" {
  rest_api_id   = aws_api_gateway_rest_api.backend-api.id
  resource_id   = aws_api_gateway_resource.dashboard.id
  http_method   = "GET"
  authorization = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_method" "dashboard-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.dashboard.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_method_response" "dashboard-200" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.dashboard.id
    http_method   = aws_api_gateway_method.dashboard-options.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

resource "aws_api_gateway_method_response" "dashboard-get" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.dashboard.id
    http_method   = aws_api_gateway_method.dashboard-get.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

# emociones
resource "aws_api_gateway_method" "emociones-get" {
  rest_api_id   = aws_api_gateway_rest_api.backend-api.id
  resource_id   = aws_api_gateway_resource.emociones.id
  http_method   = "POST"
  authorization = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_method" "emociones-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.emociones.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_method_response" "emociones-200" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.emociones.id
    http_method   = aws_api_gateway_method.emociones-options.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

resource "aws_api_gateway_method_response" "emociones-get" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.emociones.id
    http_method   = aws_api_gateway_method.emociones-get.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

#historial
resource "aws_api_gateway_method" "historial-get" {
  rest_api_id   = aws_api_gateway_rest_api.backend-api.id
  resource_id   = aws_api_gateway_resource.historial.id
  http_method   = "GET"
  authorization = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_method" "historial-post" {
  rest_api_id   = aws_api_gateway_rest_api.backend-api.id
  resource_id   = aws_api_gateway_resource.historial.id
  http_method   = "POST"
  authorization = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_method" "historial-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.historial.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_method_response" "historial-200" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.historial.id
    http_method   = aws_api_gateway_method.historial-options.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

resource "aws_api_gateway_method_response" "historial-get" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.historial.id
    http_method   = aws_api_gateway_method.historial-get.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

resource "aws_api_gateway_method_response" "historial-post" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.historial.id
    http_method   = aws_api_gateway_method.historial-post.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

# retroalimentacion
resource "aws_api_gateway_method" "retro-post" {
  rest_api_id   = aws_api_gateway_rest_api.backend-api.id
  resource_id   = aws_api_gateway_resource.retro.id
  http_method   = "POST"
  authorization = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_method" "retro-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.retro.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_method_response" "retro-200" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.retro.id
    http_method   = aws_api_gateway_method.retro-options.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

resource "aws_api_gateway_method_response" "retro-post" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.retro.id
    http_method   = aws_api_gateway_method.retro-post.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

# usuarios
resource "aws_api_gateway_method" "users-get" {
  rest_api_id   = aws_api_gateway_rest_api.backend-api.id
  resource_id   = aws_api_gateway_resource.users.id
  http_method   = "GET"
  authorization = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_method" "users-post" {
  rest_api_id   = aws_api_gateway_rest_api.backend-api.id
  resource_id   = aws_api_gateway_resource.users.id
  http_method   = "POST"
  authorization = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_method" "users-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.users.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_method_response" "users-200" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.users.id
    http_method   = aws_api_gateway_method.users-options.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

resource "aws_api_gateway_method_response" "users-get" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.users.id
    http_method   = aws_api_gateway_method.users-get.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

resource "aws_api_gateway_method_response" "users-post" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.users.id
    http_method   = aws_api_gateway_method.users-post.http_method
    status_code   = "200"
    response_models = {
        "application/json" = "Empty"
    }
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = true,
        "method.response.header.Access-Control-Allow-Methods" = true,
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

###
# API integrations
###

# dashboard
resource "aws_api_gateway_integration" "integration-dashboard-get" {
  rest_api_id             = aws_api_gateway_rest_api.backend-api.id
  resource_id             = aws_api_gateway_resource.dashboard.id
  http_method             = aws_api_gateway_method.dashboard-get.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_dashboard

  depends_on = [
    aws_api_gateway_method_response.dashboard-get
  ]
}

resource "aws_api_gateway_integration" "integration-dashboard-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.dashboard.id
    http_method   = aws_api_gateway_method.dashboard-options.http_method
    type          = "MOCK"
}

resource "aws_api_gateway_integration_response" "options-integration-reponse-dashboard" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.dashboard.id
    http_method   = aws_api_gateway_method.users-options.http_method
    status_code   = aws_api_gateway_method_response.dashboard-200.status_code
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
}

# emociones
resource "aws_api_gateway_integration" "integration-emociones-get" {
  rest_api_id             = aws_api_gateway_rest_api.backend-api.id
  resource_id             = aws_api_gateway_resource.emociones.id
  http_method             = aws_api_gateway_method.emociones-get.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_historial

  depends_on = [
    aws_api_gateway_method_response.emociones-get
  ]
}

resource "aws_api_gateway_integration" "integration-emociones-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.emociones.id
    http_method   = aws_api_gateway_method.emociones-options.http_method
    type          = "MOCK"
}

resource "aws_api_gateway_integration_response" "options-integration-reponse-emociones" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.emociones.id
    http_method   = aws_api_gateway_method.emociones-options.http_method
    status_code   = aws_api_gateway_method_response.emociones-200.status_code
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }

}

# historial
resource "aws_api_gateway_integration" "integration-historial-get" {
  rest_api_id             = aws_api_gateway_rest_api.backend-api.id
  resource_id             = aws_api_gateway_resource.historial.id
  http_method             = aws_api_gateway_method.historial-get.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_historial

  depends_on = [
    aws_api_gateway_method_response.historial-get
  ]
}

resource "aws_api_gateway_integration" "integration-historial-post" {
  rest_api_id             = aws_api_gateway_rest_api.backend-api.id
  resource_id             = aws_api_gateway_resource.historial.id
  http_method             = aws_api_gateway_method.historial-post.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_historial

  depends_on = [
    aws_api_gateway_method_response.historial-post
  ]
}

resource "aws_api_gateway_integration" "integration-historial-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.historial.id
    http_method   = aws_api_gateway_method.historial-options.http_method
    type          = "MOCK"
}

resource "aws_api_gateway_integration_response" "options-integration-reponse-historial" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.historial.id
    http_method   = aws_api_gateway_method.historial-options.http_method
    status_code   = aws_api_gateway_method_response.historial-200.status_code
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
}

# retroalimentacion
resource "aws_api_gateway_integration" "integration-retro-post" {
  rest_api_id             = aws_api_gateway_rest_api.backend-api.id
  resource_id             = aws_api_gateway_resource.retro.id
  http_method             = aws_api_gateway_method.retro-post.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_retro

  depends_on = [
    aws_api_gateway_method_response.retro-post
  ]
}

resource "aws_api_gateway_integration" "integration-retro-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.retro.id
    http_method   = aws_api_gateway_method.retro-options.http_method
    type          = "MOCK"
}

resource "aws_api_gateway_integration_response" "options-integration-reponse-retro" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.retro.id
    http_method   = aws_api_gateway_method.retro-options.http_method
    status_code   = aws_api_gateway_method_response.retro-200.status_code
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
}

# users
resource "aws_api_gateway_integration" "integration-users-post" {
  rest_api_id             = aws_api_gateway_rest_api.backend-api.id
  resource_id             = aws_api_gateway_resource.users.id
  http_method             = aws_api_gateway_method.users-post.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_usuarios

  depends_on = [
    aws_api_gateway_method_response.users-post
  ]
}

resource "aws_api_gateway_integration" "integration-users-get" {
  rest_api_id             = aws_api_gateway_rest_api.backend-api.id
  resource_id             = aws_api_gateway_resource.users.id
  http_method             = aws_api_gateway_method.users-get.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_usuarios

  depends_on = [
    aws_api_gateway_method_response.users-get
  ]
}

resource "aws_api_gateway_integration" "integration-users-options" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.users.id
    http_method   = aws_api_gateway_method.users-options.http_method
    type          = "MOCK"
}

resource "aws_api_gateway_integration_response" "options-integration-reponse-users" {
    rest_api_id   = aws_api_gateway_rest_api.backend-api.id
    resource_id   = aws_api_gateway_resource.users.id
    http_method   = aws_api_gateway_method.users-options.http_method
    status_code   = aws_api_gateway_method_response.users-200.status_code
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
}

###
# APR API
###

resource "aws_api_gateway_rest_api" "apr-api" {
  name        = "${local.identifier}-apr"
  description = "API para el proyecto de Virtualización que conecta con la aplicación de Spotify"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "apr" {
  rest_api_id = aws_api_gateway_rest_api.apr-api.id
  parent_id   = aws_api_gateway_rest_api.apr-api.root_resource_id
  path_part   = "APR_Lambda"
}

resource "aws_api_gateway_method" "apr-post" {
  rest_api_id   = aws_api_gateway_rest_api.apr-api.id
  resource_id   = aws_api_gateway_resource.apr.id
  http_method   = "POST"
  authorization = "NONE"
}

# resource "aws_api_gateway_method" "apr-options" {
#     rest_api_id   = aws_api_gateway_rest_api.apr-api.id
#     resource_id   = aws_api_gateway_resource.apr.id
#     http_method   = "OPTIONS"
#     authorization = "NONE"
# }

resource "aws_api_gateway_integration" "integration-apr-post" {
  rest_api_id             = aws_api_gateway_rest_api.apr-api.id
  resource_id             = aws_api_gateway_resource.apr.id
  http_method             = aws_api_gateway_method.apr-post.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_apr
}

resource "aws_api_gateway_deployment" "apr-deployment" {
  rest_api_id = aws_api_gateway_rest_api.apr-api.id
  stage_name  = terraform.workspace

  depends_on = [
    aws_api_gateway_method.apr-post,
    aws_api_gateway_integration.integration-apr-post
  ]
}

# STAGE configuration

resource "aws_api_gateway_usage_plan" "backend-usage-plan" {
  name = "${local.identifier}-backend-usage-plan"

  api_stages {
    api_id = aws_api_gateway_rest_api.backend-api.id
    stage  = aws_api_gateway_deployment.backend-deployment.stage_name
  }
}

resource "aws_api_gateway_usage_plan" "apr-usage-plan" {
  name = "${local.identifier}-apr-usage-plan"

  api_stages {
    api_id = aws_api_gateway_rest_api.apr-api.id
    stage  = aws_api_gateway_deployment.apr-deployment.stage_name
  }
}

resource "aws_api_gateway_usage_plan_key" "main" {
  key_id        = aws_api_gateway_api_key.api-key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.backend-usage-plan.id
}