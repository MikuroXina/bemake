#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{AboutMetadata, CustomMenuItem, Menu, MenuItem, Runtime, Submenu, WindowMenuEvent};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .menu(make_menu())
        .on_menu_event(on_menu_event)
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn on_menu_event<R: Runtime>(e: WindowMenuEvent<R>) {
    match e.menu_item_id() {
        "openBMS" => e
            .window()
            .emit("openBMS", ())
            .expect("failed to emit openBMS"),
        _ => todo!(),
    }
}

fn make_menu() -> Menu {
    Menu::new()
        .add_submenu(Submenu::new(
            "File",
            Menu::new()
                .add_native_item(MenuItem::About("Bemake".into(), AboutMetadata::default()))
                .add_item(CustomMenuItem::new(
                    "checkForUpdates",
                    "Check for Updates...",
                ))
                .add_native_item(MenuItem::Separator)
                .add_item(CustomMenuItem::new("newBMS", "New BMS"))
                .add_native_item(MenuItem::Separator)
                .add_item(CustomMenuItem::new("openBMS", "Open BMS..."))
                .add_native_item(MenuItem::Separator)
                .add_item(CustomMenuItem::new("save", "Save"))
                .add_item(CustomMenuItem::new("saveAs", "Save As..."))
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::CloseWindow)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Quit),
        ))
        .add_submenu(Submenu::new(
            "Edit",
            Menu::new()
                .add_native_item(MenuItem::Undo)
                .add_native_item(MenuItem::Redo)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Cut)
                .add_native_item(MenuItem::Copy)
                .add_native_item(MenuItem::Paste),
        ))
        .add_submenu(Submenu::new(
            "Help",
            Menu::new().add_item(CustomMenuItem::new("github", "Open the GitHub repository")),
        ))
}
