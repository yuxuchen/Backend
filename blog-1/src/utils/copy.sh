#！/bin/sh
cd /Users/Shared/Previously/Security/work/web/web-bootcamp/basic/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
