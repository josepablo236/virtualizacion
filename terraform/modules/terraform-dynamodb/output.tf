output "output" {
  value = {
    table-retro = aws_dynamodb_table.retroalimentacion
    table-emociones         = aws_dynamodb_table.emociones
    table-resultado         = aws_dynamodb_table.resultado
    table-usuarios          = aws_dynamodb_table.usuarios
  }
}
