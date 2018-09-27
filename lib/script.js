/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */
'use strict';
/**
 * Sample transaction processor function.
 * @param {org.blockchain.unichain.registerAttendance} tx The sample transaction instance.
 * @transaction
 */
async function registerAttendance(tx) {
    // eslint-disable-line no-unused-vars

    // Check if attendees exist or not and // Update the asset with the new value.
    if (tx.practical.attendees) {
        tx.practical.attendees.push(tx.attendee);
        tx.practical.total_attendees += 1;
    } else {
        tx.practical.attendees = [];
        tx.practical.attendees.push(tx.attendee);
        tx.practical.total_attendees += 1;
    }

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.blockchain.unichain.Class');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.practical);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent(
        'org.blockchain.unichain',
        'AttendanceRegistered'
    );
    event.practical = tx.practical;
    emit(event);
}

/**
 * Sample transaction processor function.
 * @param {org.blockchain.unichain.endSession} tx The sample transaction instance.
 * @transaction
 */
async function endSession(tx) {
    // eslint-disable-line no-unused-vars

    // Change the active value to false to end the session
    tx.practical.active = false;

    // Empty the otp string
    tx.practical.otp = '';

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.blockchain.unichain.Class');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.practical);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.blockchain.unichain', 'SessionEnded');
    event.practical = tx.practical;
    emit(event);
}
