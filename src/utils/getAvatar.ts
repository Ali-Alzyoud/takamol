import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

function getAvatar(seed: string) {
  const avatar = createAvatar(lorelei, {
    seed: seed,
  });
  return avatar.toDataUri();
}

export default getAvatar;
