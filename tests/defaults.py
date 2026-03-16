"""Test default values. Load from tests.credentials if present (gitignored), else use fallbacks."""

try:
    from tests.credentials import DEFAULT_PASSWORD
except ImportError:
    DEFAULT_PASSWORD = "testpass123"
