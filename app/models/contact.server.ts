import {prisma} from "~/db.server";

type ContactMutation = {
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export function getContact(id: string) {
  return prisma.contact.findFirst({
    select: {
      id: true,
      first: true,
      last: true,
      avatar: true,
      twitter: true,
      notes: true,
      favorite: true,
      createdAt: true,
    },
    where: {id},
  });
}

export function getContacts() {
  return prisma.contact.findMany({
    select: {
      id: true,
      first: true,
      last: true,
      avatar: true,
      twitter: true,
      notes: true,
      favorite: true,
      createdAt: true,
    },
    orderBy: {createdAt: "desc"},
  });
}

export function createContact(contact: ContactMutation) {
  return prisma.contact.create({data: {...contact}});
}

export function updateContact({id, updates}: {id: string; updates: ContactMutation}) {
  return prisma.contact.update({where: {id}, data: {...updates}});
}

export function deleteContact(id: string) {
  return prisma.contact.deleteMany({where: {id}});
}
