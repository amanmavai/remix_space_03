import type {LinksFunction, LoaderFunctionArgs} from "@remix-run/node";
import {json, redirect} from "@remix-run/node";
import contactsStyles from "../styles/contacts.css";
import {Form, Outlet, useLoaderData} from "@remix-run/react";
import {createContact, getContacts} from "~/models/contact.server";

export const links: LinksFunction = () => [{rel: "stylesheet", href: contactsStyles}];

export async function createEmptyContact() {
  const contact = await createContact({first: "No", last: "Name"});
  return contact;
}

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({params}: LoaderFunctionArgs) => {
  const contacts = await getContacts();
  if (!contacts) {
    throw new Response("Not Found", {status: 404});
  }
  return json({contacts});
};

export default function ContactsPage() {
  const {contacts} = useLoaderData<typeof loader>();
  return (
    <div className="flex h-full">
      <div id="sidebar" className="h-full">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <a href={`/contacts/${contact.id}`}>
                  {contact.first} {contact.last}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
