provider "aws" {
  region = "us-east-2"
}

//---------------------------------
//---------------------------------
// SECURITY GROUPS
//---------------------------------
//---------------------------------

resource "aws_security_group" "mvp-server-sg" {
  name        = "mvp-server-sg"
  description = "Security group for mvp server"
  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # Server port access from anywhere
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # HTTP traffic from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # Outbound access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

//---------------------------------
//---------------------------------
// APPLICATION SERVER
//---------------------------------
//---------------------------------

resource "aws_instance" "mvp-server" {
  count = 1
  ami = "ami-0303c7b2e7066b60d"
  instance_type = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.mvp-server-sg.id}"]
  key_name = "jKey"
  # scp env vars to instance
  provisioner "file" {
    source = "env.sh"
    destination = "/home/ec2-user/env.sh"
  }
  # install dependencies to clone repo and run start script
  provisioner "remote-exec" {
    inline = [
      "sudo yum update -y",
      "sudo yum install git -y",
      "curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -",
      "sudo yum -y install nodejs",
      # "git clone https://github.com/jgarciabengochea/mvp.git",
      # "source /home/ec2-user/env.sh",
      # "cd mvp/",
      # "sudo npm install -g forever",
      # "sudo npm install",
      # "forever start server/index.js"
    ]
  }
  connection {
    user = "ec2-user"
    private_key = "${file("/Users/javi/.ssh/jKey.pem")}"
  }
  tags {
    Name = "mvp-server"
  }
}

//---------------------------------
// IP ADDRESSES
//---------------------------------

output "server-public-addresses" {
  value = ["${aws_instance.mvp-server.*.public_ip}"]
}
output "server-private-addresses" {
  value = ["${aws_instance.mvp-server.*.private_ip}"]
}
