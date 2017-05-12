from __future__ import absolute_import, print_function, unicode_literals

import datetime
import subprocess
from codecs import open
from os import path

from setuptools import find_packages, setup
from setuptools.command.sdist import sdist as base_sdist

from wagtailclearstream import __version__

here = path.abspath(path.dirname(__file__))

# Get the long description from the README file
with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()


class sdist(base_sdist):
    def run(self):
        self.compile_assets()
        base_sdist.run(self)

    def compile_assets(self):
        try:
            subprocess.check_call(['npm', 'run', 'build'])
        except (OSError, subprocess.CalledProcessError) as e:
            print('Error compiling assets: ' + str(e))
            raise SystemExit(1)


setup(
    name='wagtailclearstream',
    version=__version__,
    description='Improvement to StreamField UI by extending StreamBlock.',
    long_description='This gives support to StreamField UI by allowing neater '
    'nesting of StreamField blocks, allowing StreamField blocks to be opened '
    'or collapsed, and ensuring that a user confirms the deletion of a '
    'StreamField block before it is deleted.',
    url='https://github.com/heymonkeyriot/wagtailclearstream',
    author='Edd Baldry',
    author_email='edd.baldry@gmail.com',
    license='MIT',
    classifiers=[
        "Environment :: Web Environment",
        "Framework :: Django",
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        'Topic :: Internet :: WWW/HTTP',
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
    ],
    keywords=['development'],
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "wagtail>=1.7.0",
        "Django>=1.7.1",
    ],
    cmdclass={'sdist': sdist},
)
