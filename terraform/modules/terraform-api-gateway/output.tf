output "output" {
    value = {

        backend-api-deployment = aws_api_gateway_deployment.backend-deployment
        apr-api-deployment     = aws_api_gateway_deployment.apr-deployment
        backend-api-key        = aws_api_gateway_api_key.api-key
        backend-api            = aws_api_gateway_rest_api.backend-api
    }
}