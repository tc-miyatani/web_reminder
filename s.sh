#! /bin/bash
# `chmod +x ./s.sh`する必要あり

source ./.env

if [ $# -eq 0 ]; then
  echo '1個の引数が必要です'
elif [ $# -eq 1 ]; then
  if [ $1 = 'deploy' ]; then
    bundle exec cap production deploy
  elif [ $1 = 'ssh' ]; then
    ssh -i $SSH_KEY ec2-user@web-reminder.jp
  elif [ $1 = 'webpack' ]; then
    bin/webpack-dev-server
  elif [ $1 = 'erd' ]; then
    sudo bundle exe erd --filetype=dot
    dot -Tpng erd.dot > erd.png
  else
    echo '引数の指定が間違っています'
  fi
else
  echo '引数が多すぎます'
fi
