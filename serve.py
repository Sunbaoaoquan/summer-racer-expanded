"""Loopback-only local static server. No third-party Python packages needed."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial
import argparse, webbrowser

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8770)
    parser.add_argument('--no-open', action='store_true')
    args = parser.parse_args()
    root = Path(__file__).resolve().parent
    handler = partial(SimpleHTTPRequestHandler, directory=str(root))
    try:
        server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
    except OSError as error:
        print(f'Cannot start port {args.port}: {error}. Try --port 8771.')
        raise SystemExit(1)
    url = f'http://127.0.0.1:{args.port}/'
    print(f'Summer Run: {url}\nPress Ctrl+C to stop.')
    if not args.no_open:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()

