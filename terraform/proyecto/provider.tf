provider "aws" { 
  region = var.region
}

provider "null"{
  version = "~> 2.1"
}

provider "archive"{
  version = "~> 1.3"
}