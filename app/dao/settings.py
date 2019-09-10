# -*- coding: utf-8 -*-
import os

# Flask settings for EIM project
#
# For simplicity, this file contains only settings considered important or
# commonly used.
#

DB_CONNECT = {
    'db': os.getenv('EIM_DB_NAME'),
    'passwd': os.getenv('EIM_DB_PW'),
    'user': os.getenv('EIM_DB_WRITE'),
    'host': os.getenv('EIM_DB_HOST'),
    'port': int(os.getenv('EIM_DB_PORT')),
    'charset': 'utf8',
    'use_unicode': True
}
