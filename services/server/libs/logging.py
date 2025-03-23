from logging import basicConfig, getLogger, INFO

def setup_logging():
    basicConfig(
        level=INFO,
        format="[%(asctime)s] %(levelname)s from %(module)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )

    werkzeug_logger = getLogger('werkzeug')
    werkzeug_logger.setLevel(INFO)
