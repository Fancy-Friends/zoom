# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- zoom

"""Zoom, as one service descriptor shared by every Zoom operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

Zoom has no test estate distinct from a real account, as far as this review
found (2026-09-15) -- but it is UNVERIFIED, not confirmed. Every call
authorizes against the caller's own Zoom account and can read real meeting
data. Use fake mode while building.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "zoom"
TITLE = "Zoom"
SANDBOX = "unverified"
BASE_URLS = {
    "live": "https://api.zoom.us/v2",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "accessToken",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Zoom's auth scheme to an outgoing request.
    
    Every Zoom REST call is a Bearer token on the Authorization header, OAuth or
    Server-to-Server alike; this provider declares the user OAuth shape so a
    host can connect a rep's own Zoom account rather than one shared app-wide
    identity.
    """
    request.headers["Authorization"] = f"Bearer {credentials.get('accessToken') or ''}"


def descriptor() -> ServiceDescriptor:
    """The Zoom service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
