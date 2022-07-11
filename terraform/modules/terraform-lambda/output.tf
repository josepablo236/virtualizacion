output "output" {
  value = {
    lambda_dashboard = aws_lambda_function.dashboard
    lambda_historial = aws_lambda_function.historial
    lambda_usuarios  = aws_lambda_function.usuarios
    lambda_retro     = aws_lambda_function.retro
    lambda_apr       = aws_lambda_function.apr
  }
}