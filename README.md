# date-format
日期时间格式化，支持多种日期时间格式的传入和输出
# install
npm install -g date-format-sly
# github
https://github.com/turboosun/date-format.git
# usage
let formatter = require('./index')

formatter.dateFormat(Time,'MM-dd hh:mm','show')

Time：需要格式化的日期时间，支持传入多种格式  eg：1888-09-10T10:11、1888-09-10 10:11、1888/09/10 10:11

'MM-dd hh:mm'：输出的格式化后的样式，具体有以下几种形式：

                'yyyy-MM-dd'、

                'yyyy年MM月dd日'、

                'MM-dd hh:mm'、

                'MM-dd'、

                'yyyy年MM月dd日hh时mm分ss秒'、

                'yy.MM.dd hh:mm'、

                'yyyy.MM.dd hh:mm'

'show'：传入“show”字段，用于区分是否需要将最近48小时的时间细分，按照“刚刚”、“几分钟”、“几小时前”、“一天前”等等
如果是 不足一小时 显示多少分钟前
   如果 不足24小时 显示 多少小时前
   如果 48小时 > time ＞ 24小时 显示1天前，默认不传此参数，是不做处理的

