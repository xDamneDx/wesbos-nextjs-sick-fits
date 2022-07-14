// At it's simplest, the access control returns a yes or no value
// depending on the users session

import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no:
export const permissions = {
  ...generatedPermissions,
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter
// which limits which products they can CRUD.

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have a permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If no, do they own that item?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have a permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If no, do they own that item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have a permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If no, do they own that item?
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }
    // They should only see available products (base on the status field)
    return { status: "AVAILABLE" };
  },
};
