# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/obf-token-create.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/obf-token-create.json (or weaver's template/) and
# regenerate:
#
# npm run provider -- zoom

"""Mint a short-lived token so a bot can join a Zoom meeting on the authorising
user's behalf.

GET /users/me/token —
https://developers.zoom.us/blog/transition-to-obf-token-meetingsdk-apps/

This describes the request. `call` resolves the connection, picks the
estate, and either calls Zoom or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "obf_token_create"
METHOD = "GET"
PATH = "/users/me/token"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("meetingId") is None or config.get("meetingId") == "":
        raise ConnectorConfigError(
            "obf_token_create: \"meetingId\" is required (Meeting ID)."
        )

    out: dict[str, Any] = {}
    _value = config.get("meetingId")
    if _value is None or _value == "":
        raise ConnectorConfigError("obf_token_create: \"meetingId\" is required.")

    out["meeting_id"] = str(_value)

    out["type"] = "onbehalf"
    return out


def obf_token_create(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Mint a short-lived token so a bot can join a Zoom meeting on the authorising user's behalf.
    """
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
